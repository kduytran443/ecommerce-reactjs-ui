function SpecificationList({ list = [] }) {
    return (
        <ul className="flex flex-col bg-slate-100 rounded p-4 w-full items-center">
            {list.map((item, index) => {
                return (
                    <li className="w-full mt-2 mb-4 flex-col text-gray-700" key={index}>
                        <div className="w-full font-bold">{item.specificationName}</div>
                        <div className="w-full">{item.content}</div>
                    </li>
                );
            })}
        </ul>
    );
}

export default SpecificationList;
