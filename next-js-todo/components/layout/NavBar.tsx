"use client";

// import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const RoutesMap = {
  READ: "/todo/read",
  CREATE: "/todo/create",
} as const;

const NavBar = () => {
  //https://nextjs.org/docs/messages/next-router-not-mounted
  const router = useRouter();
  const pathname = usePathname();

  const routesEntries = Object.entries(RoutesMap);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {routesEntries.map((e) => {
        const [tabName, path] = e;
        const isCurrentPath = pathname === path;
        const style = {
          border: "1px solid black",
          backgroundColor: isCurrentPath ? "LightBlue" : "",
        };

        return (
          //   <Link key={tabName} href={path}>
          <button
            onClick={() => {
              router.push(path);
            }}
            key={tabName}
            type="button"
            style={style}
          >
            {tabName}
          </button>
          //   </Link>
        );
      })}
    </div>
  );
};

export default NavBar;
