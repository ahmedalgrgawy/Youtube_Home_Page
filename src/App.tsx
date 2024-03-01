import { useState } from "react";
import Category from "./Components/Category";
import { categories, videos } from "./Data/data";
import PageHeader from "./Layout/PageHeader";
import VideoItem from "./Components/VideoItem";
import SideBar from "./Layout/SideBar";
import { SidebarProvider } from "./Context/SidebarContext";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <SideBar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <Category categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map(video => (
                <VideoItem  {...video} key={video.id} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </SidebarProvider>
  )
}