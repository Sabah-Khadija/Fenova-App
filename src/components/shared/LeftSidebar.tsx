import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
           src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTAsMTUwIDEwMCwxMCAxOTAsMTAgMTAiIGZpbGw9IiNmZjMyMGEiIHRyYW5zZm9ybT0icm90YXRlKC05MCAxMDAgMTAwKSIvPjwvc3ZnPg=="
           alt="logo"
           width={50}
           height={36}
           />
           <h1 className="mt-1 text-3xl font-fenova font-bold">fenova</h1>
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            {user.imageUrl ? (
           <img
           src={user.imageUrl}
           alt="profile"
           className="h-14 w-14 rounded-full"
           />
          ) : (
          <Icon
           icon="streamline-freehand:job-candidate-target-1"
           width={56} // ajuste la taille si besoin
           height={56}
           className="rounded-full text-gray-400" // ajoute arrondi et couleur placeholder
           />
           )}
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-rose-300"
                }`}>
                <NavLink
                 to={link.route}
                className="flex gap-4 items-center p-4"
                >
               <Icon
                icon={link.icon}
                width="24"
                height="24"
                className={`group-hover:text-white ${isActive && "text-white"}`}
               />
             {link.label}
             </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={(e) => handleSignOut(e)}>
        <Icon icon="streamline-freehand:worker-lay-off-fired-user-finger-1" width="24" height="24" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
