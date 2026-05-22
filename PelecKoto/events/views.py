from django.shortcuts import render, redirect

from .forms import EventRegistrationForm


def event_registration(request):
    if request.method == 'POST':
        form = EventRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('event_registration_success')
    else:
        form = EventRegistrationForm()

    return render(request, 'events/event_registration.html', {'form': form})


def event_registration_success(request):
    return render(request, 'events/event_registration_success.html')

