import { format } from 'date-fns';
import Link from 'next/link';
import {
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

const Footer = () => (
  <div className="max-w-7xl mx-auto text-center py-12">
    {/* start: Social icons */}
    <ul className="mx-auto max-w-md text-center text-2xl font-light space-x-3">
      <li className="inline-block">
        <a href="https://twitter.com/asteyocompany">
          <TwitterOutlined size="large" />
        </a>
      </li>
      <li className="inline-block">
        <a href="https://www.linkedin.com/company/asteyo/about/">
          <LinkedinOutlined size="large" />
        </a>
      </li>
      <li className="inline-block">
        <a href="https://www.instagram.com/asteyocompany">
          <InstagramOutlined size="large" />
        </a>
      </li>
      <li className="inline-block">
        <a href="https://www.youtube.com/asteyo">
          <YoutubeOutlined size="large" />
        </a>
      </li>
    </ul>
    {/* end: Social icons */}

    <div className="">
      <ul className="space-x-2">
        <li className="inline-block text-base underline">
          <Link href="/privacy">Privacy</Link>
        </li>
        <li className="inline-block text-base underline">
          <Link href="/terms">Terms</Link>
        </li>
        <li className="inline-block text-base underline">
          <Link href="https://discord.gg/guR7hYb9fH">Join Discord</Link>
        </li>
      </ul>
    </div>
    <p>
      <span className="font-secondary inline-block tracking-wide text-xl font-bold text-primary-600">
        asteyo&nbsp;
      </span>
      © Copyright {format(new Date(), 'yyyy')}. All rights reserved.
    </p>
  </div>
);

export default Footer;
