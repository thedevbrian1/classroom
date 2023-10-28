import { redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import { getSession, sessionStorage } from "~/session.server";
import { badRequest, validateEmail } from "~/utils";

export async function action({ request }) {
    const session = await getSession(request);

    const formData = await request.formData();
    const email = formData.get('email');

    // Validation
    const fieldErrors = {
        email: validateEmail(email)
    };

    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({ fieldErrors });
    }

    // Send email invite
    session.set('email', email);
    return redirect('/classroom', {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session)
        }
    });
}

export default function Invite() {
    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <div className="px-8 mt-16 max-w-md">
            <div className="border border-brand-gray rounded border-opacity-30 py-16 px-10">
                <Heading text='Invite students' />
                <h2 className="font-semibold text-sm mt-4">Invite link</h2>
                <p className="text-blue-500">https://room.com//c/NjM0OTQyNTQxMDk1?cjc=alxt</p>
                <Form method="post" className="mt-4">
                    <fieldset>
                        <div>
                            <Label htmlFor='email' text='Email' />
                            <Input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='johndoe@email.com'
                                fieldError={actionData?.fielErrors.email}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-brand-orange rounded text-white px-4 py-2"
                        >
                            {isSubmitting ? 'Inviting...' : 'Invite'}
                        </button>
                    </fieldset>
                </Form>
            </div>
        </div>
    )
}