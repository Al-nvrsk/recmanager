import React from "react";
import { memo } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = memo(() => {
    const { id } = useParams<{id: string}>();
    return (
        <div>
            Profile page = {id}
        </div>
    )
})

export default ProfilePage
