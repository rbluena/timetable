/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import Link from 'next/link';
import { PlayIcon } from '@app/components/Icons';
import VideoPlayer from './VideoPlayer';
import Features from './Features';
import UseCase from './UseCase';
import Price from './Price';
import Roadmap from './Roadmap';

const Index = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="bg-white pb-24 relative border-b border-primary-100">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-secondary tracking-wide text-xl font-bold p-4 relative">
            <Link href="/">
              <a className="text-primary-600 hover:text-primary-600">
                asteyo&nbsp;
                <span className="text-secondary-400 text-xs absolute top-6">
                  Beta
                </span>
              </a>
            </Link>
          </div>
        </header>
        {/* start: Hero */}
        <div className="max-w-7xl mx-auto relative flex flex-wrap md:flex-nowrap items-center">
          <main className="pt-6 mx-auto max-w-7xl px-4 sm:pt-8 sm:px-6 md:pt-10 lg:pt-20 lg:px-8 xl:pt-12">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-center lg:text-left text-3xl md:text-5xl tracking-tight font-extrabold text-gray-900">
                <span className="block xl:inline">
                  Schedule and track progress with&nbsp;
                </span>
                <span className="block text-primary-600  xl:inline">
                  Asteyo.{' '}
                </span>
              </h1>
              <p className="mt-3 text-base text-neutral-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Plan your schedules and manage progress of your tasks on
                personal or team projects. Projects can be privately or publicly
                accessible.
              </p>

              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/signup">
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10">
                      Get started
                    </a>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/examples">
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                      Examples
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </main>

          <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 mx-6 md:ml-0 mt-4">
            <div
              className="rounded-xl relative cursor-pointer"
              role="button"
              onClick={() => setOpenModal(true)}
            >
              <img
                className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-xl shadow-lg"
                src="https://images.unsplash.com/photo-1588453251771-cd919b362ed4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=80"
                alt=""
              />
              <div className="bg-white shadow-2xl opacity-95 p-6 rounded-full absolute -m-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <PlayIcon variant="secondary" size="lg" />
              </div>
            </div>
          </div>
        </div>
        {/* end: Hero */}
      </div>
      <Features />
      <UseCase />
      <Roadmap />
      <Price />

      {/* start: Video modal */}
      <VideoPlayer isOpen={openModal} closeModal={() => setOpenModal(false)} />
      {/* end: Video modal */}
    </>
  );
};

export default Index;
