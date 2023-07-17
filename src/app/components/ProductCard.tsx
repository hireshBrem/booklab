'use client';

export default function ProductCard({title}: {title:string}) {
  return (
        <div className='rounded-md h-60 w-40'>
            <h1>{title}</h1>
        </div>

  );
}
