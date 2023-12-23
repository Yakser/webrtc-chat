import {createContext} from "react";
import {SocketType} from "@/utils/types";

export const SocketContext = createContext<SocketType | null>(null);
