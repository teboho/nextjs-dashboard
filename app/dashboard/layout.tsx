import SideNav from '@/app/ui/dashboard/sidenav';

/**
 * 
 * @param param0 props come in with the children property, which is nothing but a react node itself
 * @returns another react node
 */
export default function Layout({ children }: { children: React.ReactNode }): React.ReactNode {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden"> 
            <div className='w-full flex-none md:w-64'>
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    );
}