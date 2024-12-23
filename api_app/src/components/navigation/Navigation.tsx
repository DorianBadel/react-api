import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ModeToggle } from "./ThemeToggle";

type NavigationItem = {
  name: string;
  link: string;
};

const navigationItems: NavigationItem[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

function Navigation() {
  return (
    <div className="flex justify-between items-center w-full px-4">
      <div className="flex">
        <NavigationMenu>
          <NavigationMenuList>
            <ToggleGroup type="single" defaultValue="Home">
              {navigationItems.map((item) => (
                <ToggleGroupItem value={item.name} key={item.name}>
                  <NavigationMenuItem key={item.name}>
                    <NavLink to={item.link}>
                      <NavigationMenuLink>{item.name}</NavigationMenuLink>
                    </NavLink>
                  </NavigationMenuItem>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <ModeToggle />
    </div>
  );
}

export default Navigation;
