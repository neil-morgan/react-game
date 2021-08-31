import paths from "./paths";

const IconDefs = () => (
  <svg style={{ display: "none" }}>
    <defs>
      {paths.map((icon, index) => (
        <svg
          id={`${icon.name}-icon`}
          viewBox="0 0 20 20"
          fill="currentColor"
          key={index}
        >
          <path d={icon.path} />
        </svg>
      ))}
    </defs>
  </svg>
);

export default IconDefs;
