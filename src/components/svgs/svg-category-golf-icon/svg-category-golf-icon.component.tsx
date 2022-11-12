import { ISvgCategoryGolfIcon } from "./svg-category-golf-icon.interface";

const SvgCategoryGolfIcon = (props: ISvgCategoryGolfIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="#374553" fillRule="evenodd">
          <path d="M12.602 6.046a1.45 1.45 0 1 1-2.9 0 1.45 1.45 0 0 1 2.9 0M11.396 8.8a.342.342 0 0 1-.068-.676l6.406-1.299a.342.342 0 0 1 .403.266.342.342 0 0 1-.267.403l-6.406 1.3a.32.32 0 0 1-.068.006M14.162 22.841a.341.341 0 0 1-.339-.386l.897-6.769-1.398-2.864-6.702 9.5a.341.341 0 1 1-.557-.392l7.366-10.444 1.995 4.086-.924 6.973a.341.341 0 0 1-.338.296"/>
          <path d="M17.802 7.501a.34.34 0 0 1-.182-.053L9.012 2.011l-.33.802a.34.34 0 1 1-.631-.259L8.689 1l9.296 5.871a.341.341 0 0 1-.183.63"/>
        </g>
      </svg>
    </>
  );
};

export default SvgCategoryGolfIcon;