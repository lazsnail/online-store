import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import background from "../public/RE.jpeg";
import mosaic from "../public/mosaic.jpg";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
	const supabase = createServerComponentClient({ cookies });

	let { data: store_items, error } = await supabase
		.from("store_items")
		.select("*");
	if (error) {
		console.log(error);
	}

	return (
		<main className="flex min-h-screen flex-col items-center">
			{/** 
            <section
				className="p-12 mt-28 grid place-items-center"
				style={{
					backgroundImage: `url(${background.src})`,
					height: "100%",
					width: "100%",
					backgroundSize: "cover",
				}}
			>
				<div className="h-fit p-4 text-xl text-black bg-white bg-opacity-60 font-bold text-center flex flex-col items-center gap-5">
					<span>
						Shipping update! 2X Faster Shipping for Brisbane!
					</span>
					<button className="bg-white text-black w-fit p-2 hover:bg-black hover:text-white transition">
						Click Here
					</button>
				</div>
			</section>
			<section
				className="p-12 flex flex-col gap-5 items-center"
				style={{
					backgroundImage: `url(${mosaic.src})`,
					height: "100%",
					width: "100%",
					backgroundSize: "cover",
				}}
			>
				<span className="text-center text-2xl text-black font-bold">
					How to store nicotine pouches
				</span>
				<button className="border-2 border-black text-black w-fit p-2 font-bold hover:bg-black hover:text-white transition">
					Click Here
				</button>
				<span className=" mt-4 text-center text-2xl text-black font-bold">
					How to quit smoking
				</span>
				<button className="border-2 border-black text-black w-fit p-2 font-bold hover:bg-black hover:text-white transition">
					Click Here
				</button>
			</section>
            */}
			<section className=" w-full mt-28">
				<h1 className="text-2xl text-white text-center py-10 font-bold">
					Store
				</h1>
				<div className="flex flex-wrap justify-center gap-5 p-4 pt-0">
					{store_items &&
						store_items.map((item, index) => (
							<div
								key={index}
								className="w-fit min-w-[180px] p-3 text-black border-2 border-white rounded-lg flex flex-col items-center gap-3"
							>
								<Image
									src={item.image_url}
                                    width={96}
                                    height={96}
									alt="Product image"
								></Image>
								<span className="text-lg font-bold text-white">
									{item.name}
								</span>
								<span className="text-white">
									${item.price}
								</span>
								<Link
									href={`/product/${encodeURIComponent(
										item.id
									)}`}
									className="border-2 text-white hover:bg-white hover:text-black transition p-3"
								>
									View Product
								</Link>
							</div>
						))}
				</div>
			</section>
		</main>
	);
}
