import React, { useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const navbar = ({ onCartClick }) => {
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [showAuthModal, setShowAuthModal] = useState(false);
	const { getTotalItems } = useCart();
	const { isAuthenticated, logout, user } = useAuth();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleDownloadMenu = () => {
		const link = document.createElement("a");
		link.href = "/images/menu.png";
		link.download = "menu.png";
		link.click();
		setIsDropdownOpen(false);
	};

	const handleLogout = async () => {
		await logout();
		setIsDropdownOpen(false);
		router.push("/");
	};

	const handleSmoothScroll = (e) => {
		const href = e.currentTarget.getAttribute("href");
		if (href && href.startsWith("#") && href.length > 1) {
			e.preventDefault();
			const target = document.querySelector(href);
			if (target) {
				target.scrollIntoView({ behavior: "smooth" });
				setIsMenuOpen(false);
			}
		}
	};

	return (
		<div>
			<nav className="bg-white border-gray-200 py-2.5 shadow-lg fixed top-0 inset-x-0 z-50">
				<div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
					<a href="/" className="flex items-center">
						<img src="/remen_logo.svg" className="h-14 mr-1 sm:h-14" alt="Logo" />
						<div className="flex flex-col items-left -space-y-9">
						
						</div>
					</a>
					<div className="flex items-center lg:order-2"></div>
					<div className="flex items-center lg:order-2">
						<div className="hidden mt-2 mr-4 sm:inline-block">
							<span></span>
						</div>

						<button
						onClick={() => {
							if (!isAuthenticated) {
								setShowAuthModal(true);
								return;
							}
							onCartClick();
						}}
						className="relative inline-flex items-center justify-center p-2 mr-3 rounded-lg focus:outline-none transition text-gray-500 hover:bg-gray-100"
						title={!isAuthenticated ? "Klik untuk login atau register" : ""}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						{isAuthenticated && getTotalItems() > 0 && (
							<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
								{getTotalItems()}
							</span>
							)}
						</button>

						{/* Dropdown Menu 3-in-1 */}
						<div className="relative inline-block">
							<button
								onClick={toggleDropdown}
								className="text-white bg-logo-color hover:bg-logo-color/90 focus:ring-4 focus:ring-logo-color font-medium rounded-2xl text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 flex items-center gap-2 transition"
							>
								{isAuthenticated ? (
									<>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										{user?.email?.split("@")[0] || "Menu"}
									</>
								) : (
									<>
										<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
										</svg>
										Menu
									</>
								)}
								<svg className={`w-4 h-4 transition ${isDropdownOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
								</svg>
							</button>

							{/* Dropdown Menu */}
							{isDropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
									<div className="py-2">
										<button
											onClick={handleDownloadMenu}
											className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
										>
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
											</svg>
											Unduh Menu
										</button>

										{!isAuthenticated && (
											<>
												<button
													onClick={() => {
														router.push("/login");
														setIsDropdownOpen(false);
													}}
													className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t flex items-center gap-2"
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1" />
													</svg>
													Login
												</button>
												<button
													onClick={() => {
														router.push("/register");
														setIsDropdownOpen(false);
													}}
													className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
													</svg>
													Register
												</button>
											</>
										)}

										{isAuthenticated && (
											<button
												onClick={handleLogout}
												className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t flex items-center gap-2"
											>
												<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1" />
												</svg>
												Logout
											</button>
										)}
									</div>
								</div>
							)}
						</div>

						<button onClick={toggleMenu} type="button"
							className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
							aria-controls="mobile-menu-2" aria-expanded={isMenuOpen}
							>
							<span className="sr-only">Open main menu</span>
							<svg className={`w-6 h-6 ${isMenuOpen ? "hidden" : ""}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"></path>
							</svg>
							<svg className={`w-6 h-6 ${isMenuOpen ? "" : "hidden"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"></path>
							</svg>
						</button>
					</div>
					<div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? "" : "hidden"}`} id="mobile-menu-2">
						<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-12 lg:mt-0 lg:ml-40 lg:border-0">

							<li>
								<a href="#"
									onClick={handleSmoothScroll}
									className="block py-2 pl-3 pr-4 text-white bg-logo-color rounded lg:bg-transparent lg:text-logo-color lg:p-0 "
									aria-current="page">Beranda</a>
							</li>
							<li>
								<a href="#about"
									onClick={handleSmoothScroll}
									className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-logo-color lg:p-0 ">Tentang</a>
							</li>
							<li>
								<a href="#menu-unggulan"
									onClick={handleSmoothScroll}
									className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-logo-color lg:p-0">Produk</a>
							</li>
							<li>
								<a href="#contact"
									onClick={handleSmoothScroll}
									className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-logo-color lg:p-0 ">Kontak</a>
							</li>
						   
						</ul>
					</div>
				</div>
			</nav>

			{/* Auth Modal */}
			{showAuthModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
					<div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative animate-fadeIn">
						<button
							onClick={() => setShowAuthModal(false)}
							className="absolute top-3 right-3 text-gray-500 hover:text-logo-color transition"
						>
							✕
						</button>

						<div className="text-center mb-6">
							<h2 className="text-2xl font-bold text-gray-800 mb-2">Silakan Login Terlebih Dahulu</h2>
							<p className="text-gray-600 text-sm">Anda harus login atau mendaftar untuk mengakses keranjang</p>
						</div>

						<div className="space-y-3 flex flex-col">
							<button
								onClick={() => {
									setShowAuthModal(false);
									router.push("/login");
								}}
								className="w-full bg-logo-color text-white py-3 rounded-lg font-medium hover:bg-coklat-muda transition flex items-center justify-center gap-2"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1" />
								</svg>
								Login
							</button>
							<button
								onClick={() => {
									setShowAuthModal(false);
									router.push("/register");
								}}
								className="w-full border-2 border-logo-color text-logo-color py-3 rounded-lg font-medium hover:bg-logo-color hover:text-white transition flex items-center justify-center gap-2"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
								</svg>
								Register
							</button>
						</div>
					</div>
				</div>
			)}

			<script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>

		</div>
	);
}

export default navbar;