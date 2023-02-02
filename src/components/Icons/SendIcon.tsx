import { SVGProps } from "react";

export default function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.6"
        d="M9.81915 11.0937H3.97686L2.02317 3.32144C2.01066 3.27627 2.00304 3.22988 2.00044 3.18309C1.9787 2.47059 2.76334 1.97648 3.44323 2.30259L18.8 11.0937L3.44323 19.8848C2.77125 20.208 1.99649 19.7277 2.00044 19.028C2.00244 18.9655 2.01343 18.9036 2.03305 18.8442L3.48276 14.0583"
      ></path>
    </svg>
  );
}
