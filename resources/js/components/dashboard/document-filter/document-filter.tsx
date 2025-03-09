import { Button } from '@/components/ui/button';
import { documentTags } from '@/lib/constants';
import { TagType } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'resources/store/store';
import { setTag } from '../../../../store/documentSlice';

export const DocumentFilter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tag } = useSelector((state: RootState) => state.document);

    const handleTagChange = (tag: TagType) => {
        dispatch(setTag(tag));
    };

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {documentTags.map((tagItem) => {
                return (
                    <Button
                        className={`${tagItem.db_name === tag ? 'bg-(--custom-gray-80) text-white hover:bg-(--custom-gray-80)' : ''}`}
                        variant={'tag_default'}
                        size={'tag_default'}
                        key={tagItem.db_name}
                        onClick={() => handleTagChange(tagItem.db_name)}
                    >
                        {tagItem.name}
                    </Button>
                );
            })}
        </div>
    );
};
