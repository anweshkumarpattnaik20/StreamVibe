// eslint-disable-next-line react/prop-types
function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-rose-400">
            {eyebrow}
          </p>
        )}
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default SectionHeading;
