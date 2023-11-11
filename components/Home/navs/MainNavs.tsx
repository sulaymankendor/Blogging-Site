import Link from "next/link";

import TwitterLogo from "@/components/svgs/social-media-svg/TwitterLogo";
import FacebookLogo from "@/components/svgs/social-media-svg/FaceBookLogo";
import GitHubLogo from "@/components/svgs/social-media-svg/GitHubLogo";
import TwitchLogo from "@/components/svgs/social-media-svg/TwitchLogo";
import InstagramLogo from "@/components/svgs/social-media-svg/InstagramLogo";
import MastodonLogo from "@/components/svgs/social-media-svg/MastodonLogo";
import HomeLogo from "@/components/svgs/navs-svg/HomeLogo";
import { navs } from "@/lib/Navs";
import CodeOfConductLogo from "@/components/svgs/navs-svg/CodeOfConductLogo";
import PrivacyPolicyLogo from "@/components/svgs/navs-svg/PrivacyPolicyLogo";
import TermsOfUseLogo from "@/components/svgs/navs-svg/TermsOfUseLogo";

function MainNavs() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <a
          href="/"
          className="p-2 text-gray-700 ml-5 flex items-center rounded hover:bg-violet-200 hover:underline hover:text-violet-500"
        >
          <HomeLogo />
          <p className="pl-2">Home</p>
        </a>
        {navs.map((nav) => {
          return (
            <a
              key={nav.navName}
              href={nav.url}
              className="p-2 text-base mt-2 text-gray-700 ml-5 rounded flex items-center hover:text-violet-500 hover:bg-violet-200 hover:underline"
            >
              {nav.svg}
              <p className="pl-2">{nav.navName}</p>
            </a>
          );
        })}
      </div>
      <div className="flex flex-col pt-5">
        <h1 className="font-bold p-2 ml-5">Other</h1>
        <a
          href="https://dev.to/code-of-conduct"
          className="p-2 text-gray-700 ml-5 flex items- rounded hover:text-violet-500 hover:bg-violet-200 hover:underline"
        >
          <CodeOfConductLogo />
          <p className="pl-2">Code of Conduct</p>
        </a>
        <a
          href="https://dev.to/privacy"
          className="p-2 text-gray-700 ml-5 mt-2 flex rounded items-center hover:bg-violet-200 hover:underline hover:text-violet-500"
        >
          <PrivacyPolicyLogo />
          <p className="pl-2">Privacy Policy</p>
        </a>
        <a
          href="https://dev.to/terms"
          className="p-2 text-gray-700 ml-5 mt-2 flex rounded items-center hover:bg-violet-200 hover:underline hover:text-violet-500"
        >
          <TermsOfUseLogo />
          <p className="pl-2">Terms of Use</p>
        </a>
      </div>
      <div className="flex justify-between mt-6 w-52">
        <a
          href="https://twitter.com/thepracticaldev"
          className="hover:bg-blue-100 p-2 rounded"
          target="_blank"
        >
          <TwitterLogo className="fill-[#474747] hover:fill-indigo-700" />
        </a>
        <a
          href="https://facebook.com/thepracticaldev"
          className="hover:bg-blue-100 p-2 rounded"
          target="_blank"
        >
          <FacebookLogo className="fill-[#474747] hover:fill-indigo-700" />
        </a>
        <a
          href="https://github.com/forem"
          className="hover:bg-blue-100 p-2 rounded"
          target="_blank"
        >
          <GitHubLogo className="fill-[#474747] hover:fill-indigo-700" />
        </a>
        <a
          href="https://instagram.com/thepracticaldev"
          className="hover:bg-blue-100 p-2 rounded"
          target="_blank"
        >
          <InstagramLogo className="fill-[#474747] hover:fill-indigo-700" />
        </a>
        <a
          href="https://twitch.com/thepracticaldev"
          className="hover:bg-blue-100 p-2 rounded"
          target="_blank"
        >
          <TwitchLogo className="fill-[#474747] hover:fill-indigo-700" />
        </a>
        <a
          href="https://fosstodon.org/@thepracticaldev"
          className="hover:bg-blue-100 p-2 rounded"
          target="_blank"
        >
          <MastodonLogo className="fill-[#474747] hover:fill-indigo-700" />
        </a>
      </div>
      <div className="w-[225px] mx-auto mb-8">
        <p className="text-gray-500 text-sm font-normal mt-6">
          <Link
            href="/"
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            DEV Community
          </Link>{" "}
          A constructive and inclusive social network for software developers.
          With you every step of your journey.
        </p>
        <p className="text-gray-500 text-sm font-normal mt-6">
          Built on{" "}
          <a
            href="https://www.forem.com/"
            target="_blanck"
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            Forem
          </a>{" "}
          — the{" "}
          <a
            href="https://dev.to/t/opensource"
            target="_blanck"
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            open source
          </a>{" "}
          software that powers{" "}
          <a
            href="https://dev.to/"
            target="_blanck"
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            DEV
          </a>{" "}
          and other inclusive communities.
        </p>
        <p className="text-gray-500 text-sm font-normal mt-6 max-sm:mb-5">
          Made with love and{" "}
          <a
            href="https://dev.to/t/rails"
            target="_blanck"
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            Ruby on Rails.
          </a>{" "}
          DEV Community © 2016 - 2023.
        </p>
      </div>
    </div>
  );
}

export default MainNavs;
