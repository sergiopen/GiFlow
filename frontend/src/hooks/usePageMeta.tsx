import { useEffect } from 'react';

type UsePageMetaProps = {
    title?: string;
    description?: string;
};

const defaultTitle = 'GiFlow';
const defaultDescription = 'La mejor galería de GIFs';

export const usePageMeta = ({ title, description }: UsePageMetaProps) => {
    useEffect(() => {
        document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;

        let metaDescription = document.querySelector("meta[name='description']");
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description || defaultDescription);
    }, [title, description]);
};
