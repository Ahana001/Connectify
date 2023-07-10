import ContentLoader from "react-content-loader";

export function SuggestionCardSkeleton() {
  return (
    <>
      <div style={{ marginTop: "3rem" }}>
        <ContentLoader
          speed={2}
          width={400}
          height={150}
          viewBox="0 0 400 150"
          backgroundColor="#f0f0f0"
          foregroundColor="#ecebeb"
        >
          <circle cx="20" cy="20" r="20" />
          <rect x="60" y="10" rx="4" ry="4" width="100" height="10" />
          <rect x="60" y="25" rx="4" ry="4" width="100" height="10" />
          <rect x="200" y="10" rx="4" ry="4" width="80" height="30" />

          <circle cx="20" cy="80" r="20" />
          <rect x="60" y="80" rx="4" ry="4" width="100" height="10" />
          <rect x="60" y="95" rx="4" ry="4" width="100" height="10" />
          <rect x="200" y="80" rx="4" ry="4" width="80" height="30" />
        </ContentLoader>
      </div>
    </>
  );
}
