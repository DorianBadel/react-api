import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import "./nav.css";

function Navigation() {
	const [isToggled, setIsToggled] = useState(false);
	function toggle() {
		setIsToggled((t) => !t);
	}
	return (
		<nav>
			<div className="nav-center">
				<div className="nav-header">
					<Link to="/"></Link>
					<button className="nav-toggle" onClick={toggle}>
						x<i className="fas fa-bars"></i>
					</button>
				</div>

				<ul className={isToggled ? "links show-links" : "links"}>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<a href="about.html">about</a>
					</li>
					<li>
						<NavLink to="/register">Register</NavLink>
					</li>
					<li>
						<NavLink to="/login">Login</NavLink>
					</li>
				</ul>
				<ul className="social-icons">
					<li>
						<a href="https://www.twitter.com">
							<i className="fab fa-facebook"></i>
						</a>
					</li>
					<li>
						<a href="https://www.twitter.com">
							<i className="fab fa-twitter"></i>
						</a>
					</li>
					<li>
						<a href="https://www.twitter.com">
							<i className="fab fa-behance"></i>
						</a>
					</li>
					<li>
						<a href="https://www.twitter.com">
							<i className="fab fa-linkedin"></i>
						</a>
					</li>
					<li>
						<a href="https://www.twitter.com">
							<i className="fab fa-sketch"></i>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
