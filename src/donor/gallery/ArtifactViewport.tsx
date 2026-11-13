import { useEffect, useRef, useState } from "react";

/** Independent document viewport preserves actual CSS media-query behavior. */
export function ArtifactViewport({
  width,
  src,
  title,
}: {
  width: number;
  src: string;
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setAvailable(entry.contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const scale = available > 0 ? Math.min(1, available / width) : 1;
  const height = 900;
  return (
    <div ref={ref} className="gallery-viewport" style={{ height: height * scale }}>
      {available > 0 && (
        <iframe
          title={title}
          src={src}
          width={width}
          height={height}
          style={{ transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}
