'use client';
import Script from 'next/script';

interface CommentsProps {
  title?: string;
  slug: string;
}

export default function Comments({ title, slug }: CommentsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 pt-10 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Leave a Comment</h3>
      
      <div 
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="835a4c8a-32ab-437b-9d9e-7166ec526111"
        data-page-id={slug}
        data-page-url={`https://hellomacha.com/articles/${slug}`}
        data-page-title={title}
      ></div>
      
      <Script 
        src="https://cusdis.com/js/cusdis.es.js" 
        strategy="lazyOnload" 
      />
    </div>
  );
}
