import ReadingListLogo from "@/components/svgs/navs-svg/ReadingListLogo";
import PodcastsLogo from "@/components/svgs/navs-svg/PodcastsLogo";
import VideosLogo from "@/components/svgs/navs-svg/VideosLogo";
import TagsLogo from "@/components/svgs/navs-svg/TagsLogo";
import FAQLogo from "@/components/svgs/navs-svg/FAQLogo";
import ForemShopsLogo from "@/components/svgs/navs-svg/ForemShopsLogo";
import AdvertiseOnDevLogo from "@/components/svgs/navs-svg/AdvertiseOnDevLogo";
import AboutLogo from "@/components/svgs/navs-svg/AboutLogo";
import ContactsLogo from "@/components/svgs/navs-svg/ContactsLogo";
import GuidesLogo from "@/components/svgs/navs-svg/GuidesLogo";
import SoftwareComparisonLogo from "@/components/svgs/navs-svg/SoftwareComparisonLogo";
export const navs: { navName: string; url: string; svg: JSX.Element }[] = [
  {
    navName: "Reading List",
    url: "https://dev.to/readinglist",
    svg: <ReadingListLogo />,
  },
  { navName: "Podcasts", url: "https://dev.to/pod", svg: <PodcastsLogo /> },
  { navName: "Videos", url: "https://dev.to/videos", svg: <VideosLogo /> },
  { navName: "Tags", url: "https://dev.to/tags", svg: <TagsLogo /> },
  { navName: "FAQ", url: "https://dev.to/faq", svg: <FAQLogo /> },
  {
    navName: "Forem Shop",
    url: "https://shop.forem.com",
    svg: <ForemShopsLogo />,
  },
  {
    navName: "Advertise on DEV",
    url: "https://dev.to/dev-advertising-options",
    svg: <AdvertiseOnDevLogo />,
  },
  {
    navName: "About",
    url: "https://dev.to/faq",
    svg: <AboutLogo />,
  },
  { navName: "Contact", url: "https://dev.to/contact", svg: <ContactsLogo /> },
  { navName: "Guides", url: "https://dev.to/guides", svg: <GuidesLogo /> },
  {
    navName: "Software comparisons",
    url: "https://dev.to/software-comparisons",
    svg: <SoftwareComparisonLogo />,
  },
];
