import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full mb-32 py-6 px-12 flex justify-end items-center phone:mb-8 phone-sm:p-3 phone-sm:py-2 phone-sm:justify-center">
      <div className="flex gap-x-8 mr-16 phone:gap-x-4 phone:mr-8">
        <a
          className="flex gap-x-2 hover:[&>h5]:text-gray-600 hover:[&_svg]:text-gray-500"
          target="_blank"
          href="https://www.github.com/PiratiSaKaribika"
        >
          <span className="w-8 h-8 phone:w-12 phone:h-12 phone-sm:w-10 phone-sm:h-10">
            <FaGithub className="text-gray-600" />
          </span>

          <h5 className="phone:hidden">github</h5>
        </a>

        <a
          className="flex gap-x-2 hover:[&>h5]:text-gray-600 hover:[&_svg]:text-gray-500"
          target="_blank"
          href="https://www.linkedin.com"
        >
          <span className="w-8 h-8 phone:w-12 phone:h-12 phone-sm:w-10 phone-sm:h-10">
            <FaLinkedin className="text-gray-600" />
          </span>

          <h5 className="phone:hidden">linkedin</h5>
        </a>
      </div>

      <a
        className="px-6 py-3 bg-primary-200 border border-primary-30035 rounded-2xl shadow-2 hover:bg-primary-250 hover:[&>h6]:text-primary-700 phone-sm:px-2 phone-sm:py-1"
        target="_blank"
        href="https://www.gruyovich.dev"
      >
        <h6 className="text-base text-primary-600 phone-sm:text-sm">
          Visit My Portfolio
        </h6>
      </a>
    </header>
  );
}
