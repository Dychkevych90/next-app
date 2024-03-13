"use client";

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {  BellIcon, ArrowLeftStartOnRectangleIcon, UserIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
import {signOut, useSession} from "next-auth/react";


const navigation = [
  { name: 'Home', href: '/home', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'About', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const {data: session} = useSession();
  
  return (
    <header className='w-full'>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5"/>
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true"/>
                  </button>
                  
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5"/>
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-12 w-12 rounded-full"
                          // @ts-ignore
                          src={session?.user?.image}
                          alt="profile"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({active}) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'px-4 py-2 text-sm text-gray-700 flex items-center')}
                            >
                              <UserIcon className="h-6 w-6 mr-5" aria-hidden="true"/>
                              
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({active}) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'px-4 py-2 text-sm text-gray-700 flex items-center')}
                            >
                              <Cog8ToothIcon className="h-6 w-6 mr-5" aria-hidden="true"/>
                              
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({active}) => (
                            <button
                              onClick={() => signOut()}
                              className={classNames(active ? 'bg-gray-100' : '', 'w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center')}
                            >
                              <ArrowLeftStartOnRectangleIcon className="h-6 w-6 mr-5" aria-hidden="true"/>
                              
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </header>
  )
}
