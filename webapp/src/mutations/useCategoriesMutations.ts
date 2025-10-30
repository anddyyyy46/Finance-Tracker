import { CreateCategoryDto, fetchProxy, ReadCategoryDto } from "@/util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const queryKey = ["categories"]

export const useCategoriesMutations = () => {
    const queryClient = useQueryClient()

    const getAllCategories = useQuery({
        queryKey: queryKey,
        queryFn: async (): Promise< ReadCategoryDto[] | null> => {
            const res = await fetchProxy("category", {
                method: 'GET',
            });
            if(!res){
                return null;
            }
            const categories = await res.json()
            return categories;
        }
    })

    const addCategory = useMutation({
        mutationFn: async (category: CreateCategoryDto): Promise< ReadCategoryDto | null> => {
            const res = await fetchProxy("category", {
                method: 'POST',
                body: JSON.stringify(
                    category
                )
            });
            if(!res){
                return null
            }
            const categories = await res.json()
            toast.success("Erfolgreich erstellt")
            return categories;
        },
        onSuccess: 
            async ()=>await queryClient.invalidateQueries({queryKey})
        }
    )

    return {
        getAllCategories,
        addCategory
    }
}