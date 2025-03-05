"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const menus = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Blog',
    href: '/blog'
  },
  {
    label: 'Login',
    href: '/login'
  }
]


const Layout = ({children}) => {
  const pathname = usePathname()

  const blackLists=[
    '/sign-up',
    '/login'
  ]

  const isBlackListed = blackLists.includes(pathname)
  if(isBlackListed){
    return(
      <div>
        {children}
      </div>
    )
  }

  return (
    <div>
      <nav className="bg-white shadow-lg sticky top-0 left-0 w-full py-6 flex items-center justify-between p-4">
          <h1>Zohaibaay</h1>
          <div className="space-x-5">
            {
              menus.map((item, index) => (
                <Link href={item.href} key={index}
                  className={pathname===item.href ? 'text-violet-500  rounded-2xl':'text-black'}>{item.label}</Link>
              ))
            }
             <Link href="/sign-up" 
                  className= 'bg-violet-500 py-2 px-4   rounded-xl'>SignUp</Link>
          </div>

        </nav>
        <section className="px-[10%] py-10">
        {children}
        </section>
        <footer className="bg-gray-950 h-[450px] flex items-center justify-center text-white">
          <h1>My footer</h1>
        </footer>
    </div>
  )
}

export default Layout
