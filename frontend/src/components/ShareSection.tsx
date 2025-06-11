export const ShareSection = () => {
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent('Mira este GIF increíble');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
  };

  const baseIconClasses = 'w-8 h-8 fill-white transition-transform duration-200 hover:scale-110 cursor-pointer';

  return (
    <div className="flex gap-6 justify-center">
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Twitter" className="hover:text-blue-500">
        <svg className={baseIconClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M23.954 4.569c-.885.389-1.83.654-2.825.775 
              1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.559-3.594-1.559-2.717 
              0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.083-.205-7.702-2.158-10.126-5.134-.423.722-.666 1.561-.666 
              2.475 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 
              0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.32-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 
              2.179 1.397 4.768 2.213 7.557 2.213 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.633.961-.689 
              1.8-1.56 2.46-2.548l-.047-.02z"
          />
        </svg>
      </a>

      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Facebook" className="hover:text-blue-700">
        <svg className={baseIconClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.675 0h-21.35C.597 0 0 
              .592 0 1.326v21.348C0 23.407.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 
              1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.764v2.313h3.587l-.467 
              3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .592 23.405 0 22.675 0z"
          />
        </svg>
      </a>

      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Compartir en LinkedIn" className="hover:text-blue-600">
        <svg className={baseIconClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.23 0H1.77C.792 0 0 .774 0 1.727v20.545C0 23.225.792 24 1.77 
              24h20.46c.978 0 1.77-.774 1.77-1.727V1.727C24 .774 23.208 0 22.23 0zM7.07 
              20.452H3.56V9h3.51v11.452zM5.314 7.433c-1.126 0-2.037-.913-2.037-2.038 
              0-1.126.911-2.037 2.037-2.037s2.038.91 2.038 2.037c0 1.125-.912 2.038-2.038 
              2.038zm15.139 13.019h-3.51v-5.605c0-1.337-.027-3.06-1.865-3.06-1.868 
              0-2.154 1.459-2.154 2.965v5.7h-3.51V9h3.37v1.56h.047c.47-.887 1.615-1.82 
              3.324-1.82 3.557 0 4.214 2.342 4.214 5.38v6.33z"
          />
        </svg>
      </a>

      <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Compartir en WhatsApp" className="hover:text-green-500">
        <svg className={baseIconClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.52 3.48A11.914 11.914 0 0 0 12.002 
              0C5.373 0 .07 5.31.07 11.918c0 2.108.557 4.186 1.616 6.016L0 
              24l6.263-1.636a11.917 11.917 0 0 0 5.74 1.478c6.63 0 12.004-5.307 
              12.004-11.91 0-3.187-1.245-6.183-3.487-8.45zM12.003 
              21.354a9.398 9.398 0 0 1-4.825-1.41l-.346-.204-3.71.97.99-3.62-.225-.37a9.386 
              9.386 0 0 1-1.452-5.268c0-5.158 4.186-9.34 9.34-9.34 2.49 0 4.83.972 6.59 2.743 
              1.76 1.77 2.75 4.104 2.75 6.586 0 5.16-4.187 9.35-9.352 9.35zm5.06-7.04c-.28-.14-1.66-.82-1.92-.91-.26-.09-.45-.14-.64.14-.18.26-.7.91-.85 
              1.1-.16.18-.32.2-.6.07-.28-.13-1.17-.43-2.22-1.37-.82-.73-1.37-1.63-1.53-1.9-.16-.27-.02-.41.12-.54.13-.13.28-.32.42-.48.14-.16.18-.27.28-.45.1-.18.05-.34-.02-.48-.07-.13-.64-1.54-.88-2.1-.23-.55-.46-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.35-.26.27-1 1-1 2.43s1.03 2.82 1.17 3.02c.14.2 2.02 3.08 4.9 4.31.68.29 1.21.46 1.62.59.68.21 1.3.18 1.79.11.55-.08 1.66-.68 1.9-1.34.24-.66.24-1.23.17-1.35-.07-.12-.26-.2-.55-.34z"
          />
        </svg>
      </a>
    </div>
  );
};
