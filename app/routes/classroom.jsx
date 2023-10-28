import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import { getSession } from "~/session.server";
import { badRequest, validateText } from "~/utils";

export async function loader({ request }) {
    const session = await getSession(request);
    const classroom = session.get('classroom');
    return classroom;
}

export async function action({ request }) {
    const formData = await request.formData();
    const message = formData.get('message');

    // Validation
    const fieldErrors = {
        message: validateText(message)
    };

    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({ fieldErrors });
    }
    return null;
}

export default function Classroom() {
    const data = useLoaderData();
    const actionData = useActionData();

    const [isCopied, setIsCopied] = useState(false);

    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <div className="px-8 mt-16">
            <div className="bg-brand-blue w-full relative">
                <div className="absolute bottom-10">
                    <Heading text={data} />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                    <Card className="border border-brand-gray border-opacity-20 rounded py-8 px-6">
                        {/* Class code */}
                        <p className="">Class code</p>
                        <div className="flex gap-4 mt-2">
                            <p className="text-blue-500 text-lg">ajdsjdk</p>
                            <button type='button' onClick={() => setIsCopied(true)}>{isCopied ? 'Copied!' : 'Copy'}</button>
                        </div>
                    </Card>
                    <Card className="border border-brand-gray border-opacity-20 rounded py-8 px-6">
                        <p>Upcoming</p>
                        <p className="mt-4 text-gray-500">No work due soon</p>
                    </Card>
                </div>
                <div className="flex flex-col gap-4">
                    <Card className="border border-brand-gray border-opacity-20 rounded py-8 px-6">
                        Say something to your class
                        <Form method="post" className="max-w-sm mt-4">
                            <fieldset>
                                <div>
                                    <Label htmlFor='message' text='Message' />
                                    <Input
                                        type='textarea'
                                        name='message'
                                        id='message'
                                        fieldError={actionData?.fieldErrors.message}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-brand-orange rounded text-white px-4 py-2"
                                >
                                    {isSubmitting ? 'Posting...' : 'Post'}
                                </button>
                            </fieldset>
                        </Form>
                    </Card>
                    <Card>
                        <p>This is where you can talk to your class</p>
                        <p className="text-blue-500">Use the stream to share announcements, post assignments, and respond to student questions</p>
                    </Card>

                </div>
            </div>
        </div>
    );
}

function Card({ children }) {
    return (
        <div className="border border-brand-gray border-opacity-20 rounded py-8 px-6">
            {children}
        </div>
    );
}