import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

function NotFoundPage() {


  return (
    <div className="flex w-full flex-col gap-6">

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

         
          <h1 className="text-[100px] sm:text-[140px] font-bold leading-none bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] bg-clip-text text-transparent">
            404
          </h1>

          <h2 className="mt-2 text-3xl font-semibold text-zinc-900">
            Page Not Found
          </h2>

        
          <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
            The page you’re looking for doesn’t exist or may have been moved.
            You can go back or explore other sections of the site.
          </p>

          
          <div className="mt-8 flex aspect-[4/3] items-center justify-center rounded-[1.25rem] border-2 border-dashed border-zinc-300 bg-zinc-100">
            <span className="text-5xl font-bold text-zinc-400">:/</span>
          </div>

       
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            
          

             <Button to="/articles">
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </span>
            </Button>


            <Button to="/" variant="primary">
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </span>
            </Button>


          </div>

        
          <div className="mt-6 flex justify-center gap-4 text-sm text-zinc-500">
            <Link to="/" className="hover:text-zinc-900">Home</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-zinc-900">About</Link>
            <span>•</span>
            <Link to="/articles" className="hover:text-zinc-900">Articles</Link>
          </div>

        </div>
      </section>

    </div>
  );
}

export default NotFoundPage;