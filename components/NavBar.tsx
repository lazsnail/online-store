"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsCart2, BsFacebook } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavBar() {
	const [showMenu, setShowMenu] = useState(false);

	const handleMenu = () => {
		if (!showMenu) {
			setShowMenu(true);
			scrollTo({ top: 0, behavior: "smooth" });
			document.body.classList.add("overflow-hidden");
		} else {
			setShowMenu(false);
			document.body.classList.remove("overflow-hidden");
		}
	};

	return (
		<div className="fixed w-full px-4 h-28 flex items-center justify-between bg-white text-black">
			<Link
				onClick={() => showMenu && handleMenu()}
				href={"/"}
				className="p-3 hover:bg-black hover:text-white transition rounded-lg"
			>
				Logo
			</Link>

			<div className="flex items-center gap-5">
				<Link
					href={"/cart"}
					onClick={() => showMenu && handleMenu()}
					className="p-3 hover:bg-green-400 transition rounded-lg"
				>
					<BsCart2 size={30} />
				</Link>
				<button
					onClick={() => handleMenu()}
					className="p-3 hover:bg-blue-500 transition rounded-lg"
				>
					<GiHamburgerMenu size={30} />
				</button>
			</div>

			{showMenu && (
				<>
					<div
						onClick={() => handleMenu()}
						className="fixed w-screen h-screen left-0 top-28 bg-black bg-opacity-50"
					></div>

					<div className="fixed top-28 bottom-0 right-0 w-3/4 md:w-1/2 bg-white z-50 overflow-hidden flex flex-col">
						<Link
							onClick={() => handleMenu()}
							href={"/"}
							className="text-2xl text-center font-bold p-5 hover:bg-black hover:text-white transition"
						>
							Home
						</Link>
						<Link
							onClick={() => handleMenu()}
							href={"/cart"}
							className="text-2xl text-center font-bold p-5 hover:bg-black hover:text-white transition"
						>
							Cart
						</Link>
						<div className="flex items-center gap-8 justify-center p-5">
							<button>
								<AiOutlineInstagram size={50} />
							</button>
							<button>
								<BsFacebook size={40} />
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
