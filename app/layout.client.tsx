'use client';

import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { modes } from '@/utils/modes';
import Logo from '@/public/logo.png';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { ChevronDownIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/react/20/solid';
import {
  CubeTransparentIcon,
  CircleStackIcon,
  ArrowsRightLeftIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

export function Title(): React.ReactElement {
  return (
    <>
      <Image
        alt="Fumadocs"
        src={Logo}
        sizes="100px"
        className="hidden w-20 md:w-24 [.uwu_&]:block"
        aria-label="Fumadocs"
      />

      <FumadocsIcon className="size-5 [.uwu_&]:hidden" fill="currentColor" />
      <span className="max-md:hidden [.uwu_&]:hidden">Academy</span>
    </>
  );
}

export function Body({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const mode = useMode();

  return <div className={mode}>{children}</div>;
}

export function NavChildren(): React.ReactElement {

const solutions = [
  { name: 'Avalanche Fundamentals', description: 'Get a high level overview of Avalanche Consensus, Subnets and VMs', href: '/course/avalanche-fundamentals', icon: CubeTransparentIcon },
  { name: 'Subnet Architecture', description: 'Dive deeper into the Subnet architecture and deploy your own Subnets', href: '/course/subnet-architecture', icon: CircleStackIcon },
  { name: 'Teleporter', description: "Utilize Teleporter to build cross-chain dApps in Avalanche network", href: '#', icon: ArrowsRightLeftIcon },
  { name: 'HyperSDK', description: 'Learn to build customized Virtual Machines using our SDK', href: '#', icon: CodeBracketIcon },
]
const callsToAction = [
  { name: 'Documentation', href: 'https://docs.avax.network', icon: DocumentTextIcon },
  { name: 'Join our Community', href: 'https://t.me/avalancheacademy', icon: UserGroupIcon },
]

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>Explore Courses</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </PopoverButton>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              {callsToAction.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

export function useMode(): string | undefined {
  const { slug } = useParams();
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}

export function SidebarBanner(): React.ReactElement {
  const mode = useMode();
  const currentMode = modes.find((item) => item.param === mode) ?? modes[0];
  const Icon = currentMode.icon;

  return (
    <div className="-mt-2 flex flex-row items-center gap-2 rounded-lg p-2 text-card-foreground transition-colors hover:bg-muted/80">
      <Icon className="size-9 shrink-0 rounded-md bg-primary/30 bg-gradient-to-t from-background/80 p-1.5 text-primary shadow-md shadow-primary/50" />
      <div>
        <p className="font-medium">WHAT TO ADD</p>
        <p className="text-xs text-muted-foreground">
          CAN BE ANYTHING
        </p>
      </div>
    </div>
  );
}

export function FumadocsIcon(
  props: React.SVGProps<SVGSVGElement>,
): React.ReactElement {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 180 180"
      filter="url(#shadow)"
      {...props}
    >
      <circle cx="90" cy="90" r="90" fill="url(#iconGradient)" />
      <defs>
        <filter id="shadow" colorInterpolationFilters="sRGB">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="1"
            floodColor="hsl(var(--primary))"
            floodOpacity="1"
          />
        </filter>
        <linearGradient id="iconGradient" gradientTransform="rotate(45)">
          <stop offset="45%" stopColor="hsl(var(--background))" />
          <stop offset="100%" stopColor="hsl(var(--primary))" />
        </linearGradient>
      </defs>
    </svg>
  );
}
