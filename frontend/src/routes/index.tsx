import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z, ZodError } from "zod";

type Feedback = {
    _id: string;
    name: string;
    email: string;
    feedbackText: string;
    category: string;
    priority: string;
    sentiment: string;
    team: string;
    createdAt: string;
};

export const feedbackSchema = z.object({
    name: z.string().min(1, "Provide your name"),
    email: z.email("Provide a valid email"),
    text: z.string().min(1, "Provide your feedback"),
});

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [query, setQuery] = useState({ search: "", category: "", priority: "" });
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const fetchFeedbacks = async () => {
                try {
                    setIsLoading(true);

                    const params: Record<string, string> = {};
                    if (query.search) params.search = query.search;
                    if (query.category) params.category = query.category;
                    if (query.priority) params.priority = query.priority;

                    const queryString = new URLSearchParams(params).toString();
                    const url = queryString ? `/feedbacks?${queryString}` : "/feedbacks";

                    const response = await api.get(url);
                    setFeedbacks(response.data);
                } catch (error) {
                    toast.error(error.message ?? "Something went wrong");
                } finally {
                    setIsLoading(false);
                }
            };

            fetchFeedbacks();
        }, 300);

        return () => clearTimeout(timer);
    }, [query, refresh]);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsCreating(true);
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData);
            const result = await feedbackSchema.parseAsync(data);

            await api.post("/feedbacks", result);
            toast.success("Feedback submitted successfully");
            setIsOpen(false);
            setRefresh((prev) => !prev);
        } catch (error) {
            if (error instanceof ZodError) {
                setError(error.issues.map((issue) => issue.message).join(", "));
            } else {
                toast.error(error.message ?? "Something went wrong");
            }
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight">User Feedbacks</h1>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4" /> Add Feedback
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New Feedback</DialogTitle>
                            <DialogDescription>
                                Submit a new feedback below. Our intelligence system will route it properly.
                            </DialogDescription>
                        </DialogHeader>
                        {error ? (
                            <p className="rounded-md border border-destructive/30 px-3 py-2 bg-destructive/10 text-destructive">{error}</p>
                        ) : null}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input name="name" required placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input type="email" name="email" required placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Feedback</Label>
                                    <Textarea
                                        name="text"
                                        required
                                        placeholder="Describe your issue or request..."
                                        className="min-h-[100px]"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={isCreating}>
                                    {isCreating ? "Creating..." : "Submit Feedback"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-xl border">
                <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Search</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name..."
                            className="pl-9"
                            value={query.search}
                            onChange={(e) => setQuery((prev) => ({ ...prev, search: e.target.value }))}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Category</Label>
                        <Select
                            value={query.category}
                            onValueChange={(value) => setQuery((prev) => ({ ...prev, category: value === "all" ? "" : value }))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="Bug Report">Bug Reports</SelectItem>
                                <SelectItem value="Feature Request">Feature Requests</SelectItem>
                                <SelectItem value="General Query">General Queries</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Priority</Label>
                        <Select
                            value={query.priority}
                            onValueChange={(value) => setQuery((prev) => ({ ...prev, priority: value === "all" ? "" : value }))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="All Priorities" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Priorities</SelectItem>
                                <SelectItem value="HIGH">High</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="LOW">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Feedback</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Sentiment</TableHead>
                        <TableHead>Team</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                Loading intelligence...
                            </TableCell>
                        </TableRow>
                    ) : feedbacks.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                No feedbacks found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        feedbacks.map((f) => (
                            <TableRow key={f._id}>
                                <TableCell>
                                    <span>{f.name}</span>
                                    <br />
                                    <span className="text-xs text-muted-foreground">{f.email}</span>
                                </TableCell>
                                <TableCell>{f.feedbackText}</TableCell>
                                <TableCell>
                                    <Badge className="border-primary/30 bg-primary/10 text-primary">{f.category || "Uncategorized"}</Badge>
                                </TableCell>
                                <TableCell>
                                    {f.priority === "HIGH" && (
                                        <Badge className="border-destructive/30 bg-destructive/10 text-destructive">
                                            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
                                            High
                                        </Badge>
                                    )}
                                    {f.priority === "MEDIUM" && (
                                        <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-500">
                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                            Medium
                                        </Badge>
                                    )}
                                    {f.priority === "LOW" && (
                                        <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            Low
                                        </Badge>
                                    )}
                                    {!f.priority && (
                                        <Badge className="border-muted-foreground/30 bg-muted text-muted-foreground">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                            Unknown
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {f.sentiment === "POSITIVE" && (
                                        <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-500">😊 Positive</Badge>
                                    )}
                                    {f.sentiment === "NEUTRAL" && (
                                        <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-500">😐 Neutral</Badge>
                                    )}
                                    {f.sentiment === "NEGATIVE" && (
                                        <Badge className="border-destructive/30 bg-destructive/10 text-destructive">😞 Negative</Badge>
                                    )}
                                    {!f.sentiment && (
                                        <Badge className="border-muted-foreground/30 bg-muted text-muted-foreground">🤷 Unknown</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge className="border-primary/30 bg-primary/10 text-primary">🏢 {f.team || "Unassigned"}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
