import { Button } from './ui/button';

function FileUploadModal() {
    return (
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-4 rounded-xl border border-(--custom-gray-30) bg-white p-4 lg:w-[25vw]">
            <h3 className="text-xl font-semibold text-(--custom-gray-60)">File upload</h3>
            <form className="flex flex-col gap-4">
                <label>Name</label>
                <input className="px-1 py-2 border rounded-md" type="text" />
                <label>Tag</label>
                <select className="px-1 py-2 border rounded-md">
                    <option value="pdf">PDF</option>
                    <option value="doc">Doc</option>
                    <option value="invoice">Invoice</option>
                    <option value="letter">Letter</option>
                    <option value="other">Other</option>
                </select>
                <label>File</label>
                <input className="px-1 py-2 border rounded-md" type="file" />
                <Button className="mt-4" variant={'default'} type="submit">
                    Upload
                </Button>
            </form>
        </div>
    );
}

export default FileUploadModal;
