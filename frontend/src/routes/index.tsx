import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    const [isOpen, setIsOpen] = useState(false);

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
                        <div className="space-y-4 py-2">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input required placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" required placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label>Feedback</Label>
                                <Textarea required placeholder="Describe your issue or request..." className="min-h-[100px]" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Submit Feedback</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-xl border">
                <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Search</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by name..." className="pl-9" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Category</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Categories</SelectItem>
                                <SelectItem value="Bug Report">Bug Reports</SelectItem>
                                <SelectItem value="Feature Request">Feature Requests</SelectItem>
                                <SelectItem value="General Query">General Queries</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Priority</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="All Priorities" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Priorities</SelectItem>
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
                <TableBody></TableBody>
            </Table>
        </div>
    );
}
