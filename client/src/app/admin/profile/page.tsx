import AdminProfileCard from '@/components/Admin/Profile/AdminProfileCard'
import { Spotlight } from '@/components/ui/Spotlight/Spotlight'
import React from 'react'
import ExtendedColors from '../../../../color.config'

const page = () => {
    return (
        <main className="max-w-screen relative overflow-x-clip bg-primary-900 text-primary-200">
            <Spotlight
                className="-top-40 left-0 md:-top-20 md:left-60"
                fill={ExtendedColors.primary["200"]}
            />
            <section className="container mt-80 mb-32 flex flex-col gap-6 antialiased min-h-screen">
                <AdminProfileCard />
            </section>
        </main>
    )
}

export default page
