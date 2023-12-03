const HostControlPanel = ({
                              onMutePeer,
                              onRemovePeer,
                          }: {
    onMutePeer: () => void;
    onRemovePeer: () => void;
}) => (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden group-hover:block opacity-50">
        <button
            onClick={onMutePeer}
            className="p-2 rounded-l-lg border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 relative"
        >
            Микрофон
        </button>

        <button
            onClick={onRemovePeer}
            className="p-2 rounded-r-lg border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 relative"
        >
            Труба
        </button>
    </div>
);

export default HostControlPanel;
