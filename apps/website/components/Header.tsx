import Link from "@/components/Link";
import { getAuthenticatedUser } from "@/server/queries/users";
import SignInButton from "./SignInButton";
import {
	Shapes,
	ShoppingBag,
	ArrowRight,
	Trophy,
	Handshake,
	Gem,
	MessageCircle,
	CalendarDays,
	Settings2,
	List,
} from "lucide-react";
import Banner from "./Banner";
import Menu from "./Menu";
import { getRosters } from "@/server/queries/rosters";
import { getNotifications } from "@/server/queries/notifications";
import Notifications from "./Notifications";

export default async function Header() {
	const [user, rosters] = await Promise.all([
		getAuthenticatedUser(),
		getRosters({ limit: 4 }),
	]);

	const notifications = user ? await getNotifications({ user: user.id }) : [];

	return (
		<>
			<Banner />
			<header className="sticky top-0 w-full z-[60] flex justify-center">
				<div className="relative w-full max-w-[1920px]">
					<div className="pointer-events-none absolute top-0 w-full flex items-center justify-between px-16 h-32 max-xl:h-28 max-xl:px-8 max-sm:px-4 max-sm:h-20 z-40">
						<div className="flex gap-12 max-xl:gap-8 max-sm:gap-4 items-center">
							<Link
								href="/"
								className="pointer-events-auto flex gap-4 h-[2.85rem] max-sm:h-10 max-sm:gap-3 group items-center cursor-pointer select-none"
							>
								<img
									alt="Nouns logo"
									src="/logo/logo.svg"
									draggable={false}
									className="group-hover:rotate-[14deg] h-full transition-transform duration-150 select-none relative z-[60]"
								/>
								<div className="text-white font-luckiest-guy text-[2.1rem] max-sm:text-3xl select-none max-xl:hidden">
									Nouns
								</div>
							</Link>
							<nav className="pointer-events-auto flex items-center gap-8">
								<Menu />
								<ul className="flex gap-6 items-center text-white max-md:gap-0">
									<Group title="Esports" icon={<Trophy className="w-5 h-5" />}>
										<div className="flex flex-col gap-0 w-80">
											<Link
												href="/about"
												className="text-nowrap hover:bg-grey-500 transition-colors py-1.5 px-3 rounded-lg flex gap-4 items-center"
											>
												<img
													alt="Nouns logo"
													src="/logo/logo-square.png"
													className="h-10 w-10 rounded-md"
												/>
												<div>
													<p className="font-bebas-neue text-lg">About</p>
													<p className="text-grey-200">
														Learn how to get involved
													</p>
												</div>
											</Link>

											<Link
												href="/partners"
												className="text-nowrap hover:bg-grey-500 transition-colors py-1.5 px-3 rounded-lg flex gap-4 items-center"
											>
												<div className="rounded-md w-10 h-10 flex overflow-hidden bg-purple text-white items-center">
													<Handshake className="w-full h-full p-2" />
												</div>
												<div>
													<p className="font-bebas-neue text-lg">Partners</p>
													<p className="text-grey-200">Partner with us</p>
												</div>
											</Link>
											<div className="text-nowrap gap-2 flex flex-col py-3">
												<div className="flex justify-between items-center px-3">
													<p className="font-bebas-neue text-lg">Rosters</p>
													<Link
														href="/rosters"
														className="text-red text-sm flex gap-1 items-center group/rosters"
													>
														View All
														<ArrowRight className="w-4 h-4 group-hover/rosters:translate-x-0.5 transition-transform" />
													</Link>
												</div>
												<div className="px-1.5 grid grid-cols-2 w-80">
													{rosters.map((roster) => (
														<Link
															key={roster.id}
															href={`/rosters/${roster.community.id}`}
															className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-grey-500 transition-colors w-full"
														>
															<img
																src={roster.community.image}
																alt={`Our ${roster.name} roster`}
																className="w-6 h-6 rounded-md object-cover"
															/>
															<p className="text-nowrap">{roster.name}</p>
														</Link>
													))}
												</div>
											</div>
										</div>
									</Group>
									<Group
										title="Get Involved"
										icon={<Shapes className="w-5 h-5" />}
									>
										<ul className="flex flex-col gap-0 w-80">
											<li className="text-nowrap hover:bg-grey-500 transition-colors py-1.5 px-3 rounded-lg">
												<Link
													href="/rounds"
													className="flex gap-4 items-center"
												>
													<div className="rounded-md w-10 h-10 flex overflow-hidden bg-gold-500 text-white items-center">
														<Trophy className="w-full h-full p-2" />
													</div>
													<div>
														<p className="font-bebas-neue text-lg">Rounds</p>
														<p className="text-grey-200">
															Govern who and what we fund
														</p>
													</div>
												</Link>
											</li>
											<li className="text-nowrap hover:bg-grey-500 transition-colors py-1.5 px-3 rounded-lg">
												<Link
													href="/quests"
													className="flex gap-4 items-center"
												>
													<div className="rounded-md w-10 h-10 flex overflow-hidden bg-blue-500 text-white items-center">
														<Gem className="w-full h-full p-2" />
													</div>
													<div>
														<p className="font-bebas-neue text-lg">Quests</p>
														<p className="text-grey-200">Level up your nexus</p>
													</div>
												</Link>
											</li>
											{/* <li className="text-nowrap hover:bg-grey-500 transition-colors py-1.5 px-3 rounded-lg">
												<Link href="/chat" className="flex items-center gap-4">
													<div className="rounded-md w-10 h-10 flex overflow-hidden bg-green text-white items-center">
														<MessageCircle className="w-full h-full p-2" />
													</div>
													<div>
														<p className="font-bebas-neue text-lg">Chat</p>
														<p className="text-grey-200">Join the discussion</p>
													</div>
												</Link>
											</li> */}
											<li className="text-nowrap hover:bg-grey-500 transition-colors py-1.5 px-3 rounded-lg">
												<Link
													href="/discord"
													className="flex items-center gap-4"
												>
													<img
														alt="Discord logo"
														src="/discord.jpg"
														className="h-10 w-10 rounded-md"
													/>
													<div>
														<p className="font-bebas-neue text-lg">Discord</p>
														<p className="text-grey-200">
															Join the Discord server
														</p>
													</div>
												</Link>
											</li>
										</ul>
									</Group>
									<Link href="/events" className="max-md:hidden">
										<li className="flex gap-2 items-center opacity-100 hover:opacity-80 transition-opacity relative z-[60]">
											<CalendarDays className="w-5 h-5" />
											Events
										</li>
									</Link>
									<Link href="https://shop.nouns.gg" newTab>
										<li className="flex gap-2 items-center opacity-100 hover:opacity-80 transition-opacity relative z-[60]">
											<ShoppingBag className="w-5 h-5" />
											Shop
										</li>
									</Link>
								</ul>
							</nav>
						</div>
						<div className="pointer-events-auto flex gap-6 items-center relative z-[60]">
							<div className="flex gap-4 items-center">
								{/* <Link href="/leaderboard">
									<List className="text-white w-6 h-6 hover:text-white/70 transition-colors" />
								</Link> */}
								{user?.nexus ? (
									<Notifications notifications={notifications} />
								) : null}
								{user?.nexus?.admin ? (
									<Link href="/admin">
										<Settings2 className="text-white w-6 h-6 hover:text-white/70 transition-colors" />
									</Link>
								) : null}
							</div>
							<SignInButton user={user} />
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

function Group(props: {
	title: string;
	children: React.ReactNode;
	icon: React.ReactNode;
}) {
	return (
		<li className="relative group flex">
			<div className="cursor-pointer opacity-100 hover:opacity-80 transition-opacity font-semibold flex justify-center gap-2 items-center max-md:hidden">
				{props.icon}
				{props.title}
			</div>
			<div className="absolute top-6 -left-8 pt-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto max-md:hidden">
				<div className="bg-grey-600 rounded-xl p-3 flex gap-2">
					{props.children}
				</div>
			</div>
		</li>
	);
}
