import Link from 'next/link';

const AcceptInvitation = () => (
  <div className="max-w-7xl p-2" style={{ minHeight: '500px' }}>
    <div className="max-w-sm pt-14 md:pt-24 mx-auto">
      <Link href="/signup">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10">
          Sign Up
        </a>
      </Link>
    </div>
  </div>
);

export default AcceptInvitation;
