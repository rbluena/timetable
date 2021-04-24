import Link from 'next/link';

const Price = () => (
  <div className="border-t border-b border-primary-100 bg-white">
    <div className="my-12 py-12 max-w-7xl mx-auto relative">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl text-primary-600 font-semibold tracking-wide uppercase">
            Price
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Totally free
          </p>
          <p className="mt-4 max-w-2xl text-xl text-neutral-500 lg:mx-auto">
            Currently all features are offered for free and no credit card
            needed.
          </p>

          <div className="max-w-xs mx-auto mt-12">
            <Link href="/signup">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10">
                Get started
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Price;
