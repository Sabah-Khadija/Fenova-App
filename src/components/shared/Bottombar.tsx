import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "@/constants";
import { Icon } from "@iconify/react";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route}
            className={`${
              isActive && "rounded-[10px] bg-rose-300"
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <Icon
              icon={link.icon}
              width="24"
              height="24"
              className={`${isActive && "text-white"}`}
            />

            <p className="tiny-medium text-dark-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
