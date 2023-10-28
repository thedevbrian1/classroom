import { redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import { getSession, sessionStorage } from "~/session.server";
import { badRequest, validateText } from "~/utils";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }) {
  const session = await getSession(request);

  const formData = await request.formData();
  const classroom = formData.get('classroom');
  const subject = formData.get('subject');
  const room = formData.get('room');

  // Validation
  const fieldErrors = {
    classroom: validateText(classroom),
    subject: validateText(subject),
    room: validateText(room)
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors });
  }

  // Create classroom
  session.set('classroom', classroom);
  session.set('subject', subject);
  session.set('room', room);

  return redirect('/invite', {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session)
    }
  });
}

export default function Index() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="h-screen ">
      <div className="border border-brand-gray border-opacity-30 rounded max-w-xl mx-auto  py-16 px-10 mt-24">
        <Heading text='Create class' />
        <Form method="post" className="mt-8">
          <fieldset>
            <div>
              <Label htmlFor="classroom" text='Class name' />
              <Input
                type="text"
                name="classroom"
                id="classroom"
                // placeholder='Class A'
                fieldError={actionData?.fieldErrors.classroom}
              />
            </div>
            <div>
              <Label htmlFor="subject" text='Subject' />
              <Input
                type="text"
                id="subject"
                name="subject"
                // placeholder
                fieldError={actionData?.fieldErrors.subject}
              />
            </div>
            <div>
              <Label htmlFor="room" text='Room' />
              <Input
                type="text"
                id="room"
                name="room"
                fieldError={actionData?.fieldErrors.room}
              />
            </div>
            <div className="flex justify-end">
              <div className="flex gap-4">
                <button type="submit" name="_action" value="cancel" >
                  Cancel
                </button>
                <button
                  type="submit"
                  name="_action"
                  value="create"
                  className="bg-brand-orange rounded text-white px-4 py-2"
                >
                  {isSubmitting ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
