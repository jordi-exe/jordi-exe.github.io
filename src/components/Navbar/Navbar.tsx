import styles from "./Navbar.module.css";
import Profile from "../Picture/Picture";
import Hamburger from "./Hamburger/Hamburger";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSquareLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(
		() => window.matchMedia(query).matches,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);

		const handleChange = () => {
			setMatches(mediaQuery.matches);
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, [query]);

	return matches;
}

type NavbarProps = {
	onNav: (index: number) => void;
};

function Navbar({ onNav }: NavbarProps) {
	const [hamburgerOpen, setHamburgerOpen] = useState(false);

	const isMobile = useMediaQuery("(max-width: 768px)");

	const toggleHamburger = () => {
		setHamburgerOpen((prevState) => !prevState);
	};

	return (
		<div className={styles.navContainer}>
			<div className={styles.hamburger} onClick={toggleHamburger}>
				<Hamburger />
			</div>

			<motion.div
				className={styles.navMenu}
				initial={false}
				animate={isMobile ? { y: hamburgerOpen ? 0 : "-100%" } : { y: 0 }}
				transition={{ duration: 0.7, ease: "easeInOut" }}
			>
				<div className={styles.navHeader}>
					<h1>Jorge Romero</h1>
					<h3>Frontend Developer</h3>
				</div>

				<div className={styles.navBody}>
					<div className={styles.avatar}>
						<Profile src="/images/profile.webp" className="Default" />
					</div>

					<div className={styles.navButtons}>
						<button
							onClick={() => {
								onNav(0);
								toggleHamburger();
							}}
						>
							About
						</button>
						<button
							onClick={() => {
								onNav(1);
								toggleHamburger();
							}}
						>
							Experience
						</button>
						<button
							onClick={() => {
								onNav(2);
								toggleHamburger();
							}}
						>
							Projects
						</button>
					</div>
				</div>

				<div className={styles.navFooter}>
					<a href="https://github.com/jordi-exe" target="_blank">
						<FontAwesomeIcon
							icon={faGithub}
							size="2xl"
							className={styles.faIcon}
						/>
					</a>
					<a
						href="https://www.linkedin.com/in/jorge-romero3219/"
						target="_blank"
					>
						<FontAwesomeIcon
							icon={faSquareLinkedin}
							size="2xl"
							className={styles.faIcon}
						/>
					</a>
				</div>
			</motion.div>
		</div>
	);
}

export default Navbar;
