<?php

namespace App\Http\Controllers;

use App\Models\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'filename' => 'required|string',
            'tag' => 'nullable|string',
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf,doc,docx,txt|max:4096', 
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = $request->input('filename');
            $fileTag = $request->input('tag');
            $fileSize = $file->getSize();

            $extension = $file->getClientOriginalExtension();
            $fileName = $fileName . "." . $extension;

            $filePath = $file->storeAs('uploads', $fileName, 'public'); 

            $uploadedFile = UploadedFile::create([
                'user_id' => Auth::id(),
                'filename' => $fileName,
                'path' => $filePath,
                'tag' => $fileTag,
                'size' => $fileSize,
            ]);

            return response()->json([
                'message' => 'File uploaded successfully!',
                'file_path' => $filePath,
            ], 200);
        }

        return response()->json(['message' => 'File upload failed.'], 400);
    }

    public function getUserFiles(Request $request) {
        $files = UploadedFile::where("user_id", Auth::id())->get();
        return response()->json([
            'files' => $files,
        ], 200);
    }

    public function delete(Request $request, $id) {
        $file = UploadedFile::find($id);

        if (!$file){
            return response()->json(['message' => 'File not found.'], 404);
        }

        Storage::disk('public')->delete($file->path);
        $file->delete();

        return response()->json(["message"=>"File deleted successfully!"], 200);
    }
}
