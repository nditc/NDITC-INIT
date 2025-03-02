import AdminProfileCard from '@/components/Admin/Profile/AdminProfileCard'
import { Spotlight } from '@/components/ui/Spotlight/Spotlight'
import React from 'react'
import ExtendedColors from '../../../../color.config'
import ParticipantsInfoCard from '@/components/Admin/Profile/ParticipantsInfoCard'
import NoticeCard from '@/components/Admin/Profile/NoticeCard'
import MessageCard from '@/components/Admin/Profile/MessageCard'

const page = () => {
    return (
        <main className="max-w-screen relative overflow-x-clip bg-primary-900 text-primary-200">
            <Spotlight
                className="-top-40 left-0 md:-top-20 md:left-60"
                fill={ExtendedColors.primary["200"]}
            />
            <section className="container mt-80 mb-32 flex flex-col gap-6 antialiased min-h-screen">
                <AdminProfileCard />
                <ParticipantsInfoCard />
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                    <NoticeCard />
                    <MessageCard />
                </div>
            </section>
        </main>
    )
}

export default page
