function ModalOverlay({ children }: { children: React.ReactNode }) {
    return <div className="fixed top-0 left-0 z-50 w-full h-full backdrop-blur-xs">{children}</div>;
}

export default ModalOverlay;
