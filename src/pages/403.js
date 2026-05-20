import React from 'react';

import Link from 'next/link';


export default function Custom403() {

return (
    <section className="min-h-screen bg-white dark:bg-white flex items-center justify-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-logo-color">403</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-coklat-muda">Forbidden</p>
                <p className="mb-4 text-lg font-light text-black">Sorry, we can't access this page. You'll find lots to explore on the home page.</p>
                <Link href="/" className="inline-flex text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
                    Back to Homepage
                </Link>
            </div>   
        </div>
    </section>
);

}