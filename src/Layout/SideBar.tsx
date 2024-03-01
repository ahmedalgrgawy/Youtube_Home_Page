import { ChevronDown, ChevronUp, Clapperboard, Clock, Home, Library, History, PlaySquare, Repeat, ListVideo, Film, Flame, Gamepad2, Lightbulb, Music2, Newspaper, Podcast, Radio, Shirt, ShoppingBag, Trophy } from "lucide-react"
import React, { ElementType, ReactNode, useState } from "react"
import Button, { myBtnsStyles } from "../Components/Button"
import { twMerge } from "tailwind-merge"
import { playlists, subscriptions } from "../Data/sidebar"
import { UseSidebarContext } from "../Context/SidebarContext"
import { PageHeaderFirstSection } from "./PageHeader"

type SmallSidebarItemProps = {
    Icon: ElementType,
    title: string,
    url: string
}

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
    return <a href={url} className={twMerge(myBtnsStyles({ variant: 'ghost' }), 'py-4 px-1 flex flex-col items-center rounded-lg gap-1')}>
        <Icon className='w-6 h-6' />
        <div className="text-sm">
            {title}
        </div>
    </a>
}

type LargeSidebarSectionProps = {
    children: ReactNode,
    title?: string,
    visibleItemCount?: number,
}

function LargeSidebarSection({ children, title, visibleItemCount = Number.POSITIVE_INFINITY }: LargeSidebarSectionProps) {

    const [isExpanded, setIsExpanded] = useState(false);

    const childrenArray = React.Children.toArray(children).flat()

    const showExpandedButton = childrenArray.length > visibleItemCount;

    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)

    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

    return (
        <div>
            {title && (
                <div className="ml-4 mt-2 text-lg mb-1">
                    {title}
                </div>
            )}
            {visibleChildren}
            {showExpandedButton && (
                <Button onClick={() => setIsExpanded(e => !e)}
                    variant='ghost' className="w-full flex items-center rounded-lg gap-4 p-3">
                    <ButtonIcon className='w-6 h-6' />
                    <div>
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </div>
                </Button>
            )}
        </div>
    )
}

type LargeSidebarItemProps = {
    IconOrImgUrl: ElementType | string,
    title: string,
    url: string,
    isActive: boolean,
}


function LargeSidebarItem({ IconOrImgUrl, title, url, isActive = false }: LargeSidebarItemProps) {
    return <a href={url} className={twMerge(myBtnsStyles({ variant: 'ghost' }), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary " : undefined}`)}>

        {typeof IconOrImgUrl === 'string' ? (
            <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" alt="" />
        ) : (
            <IconOrImgUrl className='w-6 h-6' />
        )}

        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
        </div>
    </a>
}


export default function SideBar() {

    const { isLargeOpen, isSmallOpen, close } = UseSidebarContext()

    return (
        <>
            <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? 'lg:hidden' : 'lg:flex'}`}>
                <SmallSidebarItem Icon={Home} title='Home' url='/' />
                <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
                <SmallSidebarItem
                    Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
                <SmallSidebarItem Icon={Library} title="Library" url="/library" />
            </aside>

            {isSmallOpen && (
                <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50" />
            )}

            <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${isLargeOpen ? 'lg:flex' : 'lg:hidden'} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>

                <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                    <PageHeaderFirstSection hidden={false} />
                </div>

                <LargeSidebarSection>
                    <LargeSidebarItem IconOrImgUrl={Home} title='Home' url='/' isActive />
                    <LargeSidebarItem IconOrImgUrl={Clapperboard} title='Subscriptions' url='/subscriptions' isActive={false} />
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItem
                        IconOrImgUrl={Library}
                        title="Library"
                        url="/library" isActive={false} />
                    <LargeSidebarItem
                        IconOrImgUrl={History}
                        title="History"
                        url="/history" isActive={false} />
                    <LargeSidebarItem
                        IconOrImgUrl={PlaySquare}
                        title="Your Videos"
                        url="/your-videos" isActive={false} />
                    <LargeSidebarItem
                        IconOrImgUrl={Clock}
                        title="Watch Later"
                        url="/playlist?list=WL" isActive={false} />
                    {playlists.map((playList) => (
                        <LargeSidebarItem
                            key={playList.id}
                            IconOrImgUrl={ListVideo}
                            title={playList.name}
                            url={`/playlist?list=${playList.id}`} isActive={false} />
                    ))}
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection title="Subscriptions">
                    {subscriptions.map(subscription => (
                        <LargeSidebarItem
                            key={subscription.id}
                            IconOrImgUrl={subscription.imgUrl}
                            title={subscription.channelName}
                            url={`/@${subscription.id}`} isActive={false} />
                    ))}
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection title="Explore">
                    <LargeSidebarItem
                        IconOrImgUrl={Flame}
                        title="Trending"
                        url="/trending" isActive={false} />
                    <LargeSidebarItem
                        IconOrImgUrl={ShoppingBag}
                        title="Shopping"
                        url="/shopping" isActive={false} />
                    <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" isActive={false} />
                    <LargeSidebarItem
                        IconOrImgUrl={Film}
                        title="Movies & TV"
                        url="/movies-tv" isActive={false} />
                    <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" isActive={false} />
                    <LargeSidebarItem
                        IconOrImgUrl={Gamepad2}
                        title="Gaming"
                        url="/gaming" isActive={false} />
                    <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" isActive={false} />
                    <LargeSidebarItem
                        IconOrImgUrl={Trophy}
                        title="Sports"
                        url="/sports" isActive={false} />
                    <LargeSidebarItem
                        IconOrImgUrl={Lightbulb}
                        title="Learning"
                        url="/learning" isActive={false} />
                    <LargeSidebarItem
                        IconOrImgUrl={Shirt}
                        title="Fashion & Beauty"
                        url="/fashion-beauty" isActive={false} />
                    <LargeSidebarItem
                        IconOrImgUrl={Podcast}
                        title="Podcasts"
                        url="/podcasts" isActive={false} />
                </LargeSidebarSection>

            </aside >

        </>
    )
}

