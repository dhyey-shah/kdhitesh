// ==================== BREAKPOINTS ===============================

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`
};

// =================================================================

// ==================== SOCIAL ===============================

export const social = [
    {
        icon: "/social/call.svg",
        link: "tel:+919223431022",
        web: "tel:+919223431022",
    },
    {
        icon: "/social/whatsapp.svg",
        link: "https://wa.me/+919223431022/?text=Hi!%0AI%20just%20checked%20out%20your%20gallery%20and%20would%20like%20to%20connect%20with%20you.",
        web: "https://web.whatsapp.com/send?text=Hi!%0AI%20just%20checked%20out%20your%20gallery%20and%20would%20like%20to%20connect%20with%20you.&phone=+919223431022"
    },
    {
        icon: "/social/fb.svg",
        link: "https://www.facebook.com/kdhitesh",
        web: "https://www.facebook.com/kdhitesh"
    },
    {
        icon: "/social/instagram.svg",
        link: "https://www.instagram.com/photoshahhitesh/",
        web: "https://www.instagram.com/photoshahhitesh/"
    }
]