

export const scrollToLatestMessage = () => {
    const scrollDummy = document.querySelector("#scroll-into-view-stub");
    if (scrollDummy) {
        scrollDummy.scrollIntoView({
            behavior: "smooth",
        });
    }
}