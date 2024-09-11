import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsByQuery } from "../fetcher";
import CategoryProduct from "./categoryProduct";

const SearchResults = () => {
    const [products, setProducts] = React.useState({
        errorMessage: "",
        data: [],
    });

    const [searchParams] = useSearchParams();
    const query = searchParams.get("s");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseObject = await getProductsByQuery(query);
                setProducts(responseObject);
            } catch (error) {
                setProducts({ data: [], errorMessage: "Failed to fetch products." });
            }
        };

        if (query) {
            fetchData();
        } else {
            setProducts({ data: [], errorMessage: "No search term provided." });
        }
    }, [query]);

    const renderProducts = () => {
        if (products.errorMessage) {
            return <div>Error: {products.errorMessage}</div>;
        }

        if (products.data.length > 0) {
            return products.data.map((p) => (
                <CategoryProduct key={p.id} {...p}>
                    {p.title}
                </CategoryProduct>
            ));
        } else {
            return <div>No results found</div>;
        }
    };

    return <div>{renderProducts()}</div>;
};

export default SearchResults;
